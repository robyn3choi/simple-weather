type Props = {
  iconAlt: string;
  iconSrc: string;
  text: React.ReactNode;
};

export default function ForecastDetail({ iconAlt, iconSrc, text }: Props) {
  return (
    <div className="forecast-detail">
      <img className="forecast-detail__icon" alt={iconAlt} src={iconSrc} />
      <div className="forecast-detail__text">{text}</div>
    </div>
  );
}
