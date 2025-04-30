import {GoBack} from '@/features/GoBack';
import {Typography} from '@/shared/ui/Typography';

type Props = {
    title: string;
}

export const PageHeader = ({title}: Props) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-4">
                <GoBack/>
            </div>
            <div className="col-4 text-center">
                <Typography variant="h2" weight="fw-bold">
                    {title}
                </Typography>
            </div>
            <div className="col-4"></div>
        </div>
    );
};