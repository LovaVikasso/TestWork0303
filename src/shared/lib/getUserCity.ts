export const getUserCity = async (): Promise<string | null> => {
    if (!navigator.geolocation) return null;

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
                    );
                    const data = await res.json();
                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.settlement ||
                        data.address.county;
                    resolve(city || null);
                } catch {
                    resolve(null);
                }
            },
            () => resolve(null),
            { enableHighAccuracy: true }
        );
    });
};