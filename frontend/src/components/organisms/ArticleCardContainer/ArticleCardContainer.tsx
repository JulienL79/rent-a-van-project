import type { IArticleCardContainerProps } from "./ArticleCardContainer.props";
import "./ArticleCardContainer.scss";
import { ArticleCard } from "../../molecules/ArticleCard";

export const ArticleCardContainer: React.FC<IArticleCardContainerProps> = ({
  title,
  cards,
}) => {
  return (
    <div className="article-card-container">
      {title && <h2>{title}</h2>}
      {cards &&
        cards.length > 0 &&
        cards.map((card, index) => (
          <ArticleCard key={`card-${index}`} {...card} />
        ))}
    </div>
  );
};
