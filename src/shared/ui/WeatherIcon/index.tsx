import Image from 'next/image';

type Props = {
  icon: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
};

export const WeatherIcon = ({ icon, description, size = 'md' }: Props) => {
  const sizeMap = {
    sm: 24,
    md: 48,
    lg: 96,
  };

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      width={sizeMap[size]}
      height={sizeMap[size]}
      unoptimized
    />
  );
};
