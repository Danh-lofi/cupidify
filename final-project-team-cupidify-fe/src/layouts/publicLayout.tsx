import Navbar from '@/components/navbar/navbar';

interface IProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children }: IProps) {
    return (
        <div>
            {children}
            <Navbar />
        </div>
    );
}
