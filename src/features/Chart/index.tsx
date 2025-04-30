'use client';

type Props = {
  data: Array<{
    dt_txt: string;
    main: { temp: number };
  }>;
  width?: number;
  height?: number;
};

export const Chart = ({ data, width = 300, height = 100 }: Props) => {
  // Фиксированный диапазон температур от 0 до 30 градусов
  const minTemp = 0;
  const maxTemp = 30;
  const tempRange = maxTemp - minTemp;

  // Отступы для графика
  const padding = 15;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Создаем точки для линии графика
  const points = data
    .map((item, index) => {
      const x = padding + index * (graphWidth / (data.length - 1));
      // Инвертируем Y координату, так как в SVG 0 находится сверху
      const y =
        height -
        (padding + ((item.main.temp - minTemp) / tempRange) * graphHeight);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="temperature-chart">
      <svg width={width} height={height}>
        {/* Линия графика */}
        <polyline
          points={points}
          fill="none"
          stroke="#0d6efd"
          strokeWidth="2"
        />

        {/* Точки и значения температуры */}
        {data.map((item, index) => {
          const x = padding + index * (graphWidth / (data.length - 1));
          const y =
            height -
            (padding + ((item.main.temp - minTemp) / tempRange) * graphHeight);
          const date = new Date(item.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
          });

          return (
            <g key={item.dt_txt}>
              {/* Точка */}
              <circle cx={x} cy={y} r="3" fill="#0d6efd" />
              {/* Температура */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#000"
              >
                {Math.round(item.main.temp)}°
              </text>
              {/* День недели */}
              <text
                x={x}
                y={height - 3}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
              >
                {date}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
