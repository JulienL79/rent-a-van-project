import { Title, Meta } from "react-head";

export const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <>
    <Title>{title}</Title>
    {description && <Meta name="description" content={description} />}
    <Meta property="og:title" content={title} />
    {description && <Meta property="og:description" content={description} />}
  </>
);
