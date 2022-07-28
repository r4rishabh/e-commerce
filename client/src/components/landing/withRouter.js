import { useNavigate, useSearchParams } from 'react-router-dom';

export function withRouter(Child) {
    return (props) => {
        const params = useSearchParams();
        const navigate = useNavigate();
        return <Child {...props} params={params} />;
    }
}