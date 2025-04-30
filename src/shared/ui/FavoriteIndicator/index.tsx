"use client"

type Props = {
    isFilled: boolean;
}

export const FavoriteIndicator = ({
                                      isFilled,
                                  }: Props) => {

    return (
        <i className={`bi bi-heart${isFilled ? '-fill' : ''}`}></i>
    );
};