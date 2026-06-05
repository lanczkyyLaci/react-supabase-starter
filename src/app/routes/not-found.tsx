import {Link} from "@/components/ui/link/link.tsx";
import {paths} from "@/config/paths.ts";


const NotFoundRoute = () => {
    return (
        <div className="mt-52 flex flex-col items-center font-semibold">
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to={paths.app.dashboard.getHref()} replace>
                Go to back
            </Link>
        </div>
    );
};

export default NotFoundRoute;