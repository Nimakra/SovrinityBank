import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="mx-auto max-w-[1270px] mt-28 font-medium text-[14px] cursor-pointer">
      <Link to="/learn" className="text-dimgray-100 no-underline font-bold">Learn</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to}>
            {' > '}
            <Link to={to} className=" text-whitesmoke-300 no-underline ">{value}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;