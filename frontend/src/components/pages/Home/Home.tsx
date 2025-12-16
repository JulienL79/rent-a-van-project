import { ArticleCardContainer } from "../../organisms/ArticleCardContainer";
import { campingcarArticles, vanArticles } from "./HomeArticleData";
import { homeFormData } from "./HomeFormData";
import { useEffect, useState, useMemo } from "react";
import { useFilterStore } from "../../../store/useFilterStore";
import { Form } from "../../organisms/Form";
import { TestimonialSlider } from "../../atoms/TestimonialSlider";
import { reviews } from "./HomeReviewData";
import "./Home.scss";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { SearchPayload } from "@rent-a-van/shared/types/search.type";
import { searchVehicles } from "../../../api/searchApi";
import { PageMeta } from "../../atoms/PageMeta";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [articles, setArticles] = useState(campingcarArticles);
  const {
    vehicleType,
    startDate,
    endDate,
    radius,
    locationCity,
    locationCode,
  } = useFilterStore();
  const navigate = useNavigate();

  const handleSubmit = async (): Promise<FormSubmitResult> => {
    try {
      if (!startDate || !endDate || !radius || !locationCode) {
        throw new Error("Veuillez compléter tous les champs");
      }
      console.log(vehicleType);
      console.log(startDate);
      console.log(endDate);
      console.log(radius);
      console.log(locationCity);
      console.log(locationCode);

      const payload: SearchPayload = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        radius: radius,
        locationCode: locationCode,
        type: vehicleType,
      };

      const searchResult = await searchVehicles(payload);
      console.log(searchResult);

      navigate("/search/results", { state: { results: searchResult?.data } });

      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  };

  const formDataWithStoreValues = useMemo(() => {
    return {
      ...homeFormData,
      onSubmit: handleSubmit,
      fields: homeFormData.fields.map((field) => {
        let value: string | number = "";

        switch (field.id) {
          case "startDate":
            value = startDate
              ? new Date(startDate).toISOString().split("T")[0]
              : "";
            break;
          case "endDate":
            value = endDate
              ? new Date(endDate).toISOString().split("T")[0]
              : "";
            break;
          case "city":
            value = locationCity ?? "";
            break;
          case "radius":
            value = radius ?? 50;
            break;
        }

        return {
          ...field,
          value,
        };
      }),
    };
  }, [startDate, endDate, locationCity, radius, locationCode, vehicleType]);

  useEffect(() => {
    setArticles(vehicleType === "van" ? vanArticles : campingcarArticles);
  }, [vehicleType]);

  return (
    <div className="page home">
      <PageMeta
        title="RentAVan - Accueil"
        description="Bienvenue sur RentAVan, votre plateforme de location de vans partout en France."
      />

      <div className={`home-search ${vehicleType}-background`}>
        <Form {...formDataWithStoreValues} />
      </div>
      <ArticleCardContainer {...articles} />
      <TestimonialSlider testimonials={reviews} />
    </div>
  );
};
