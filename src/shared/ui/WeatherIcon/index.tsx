type Props = {
  icon: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
};

export const WeatherIcon = ({ icon, description, size = 'md' }: Props) => {
  const sizeMap = {
    sm: '1x',
    md: '2x',
    lg: '4x',
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@${sizeMap[size]}.png`}
      alt={description}
    />
  );
};
