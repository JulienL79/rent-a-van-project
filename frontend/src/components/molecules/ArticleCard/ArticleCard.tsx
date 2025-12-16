import { Link } from "react-router-dom";
import type { IArticleCardProps } from "./ArticleCard.props";
import "./ArticleCard.scss";

export const ArticleCard: React.FC<IArticleCardProps> = ({
  image,
  title,
  content,
  link,
}) => {
  return (
    <div className="article-card">
      <img src={image.src} alt={image.alt} className="article-card-image" />
      <div className="article-card-body">
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-content">{content}</p>
        <Link to={link}>Lire la suite...</Link>
      </div>
    </div>
  );
};
