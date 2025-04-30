import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button';

export const GoBack = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
      <Button onClick={handleGoBack} className="d-flex align-items-center gap-2">
          <i className="bi bi-arrow-left-short"></i>
          Back
      </Button>
  );
};
