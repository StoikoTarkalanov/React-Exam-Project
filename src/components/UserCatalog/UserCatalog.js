/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { isUserGuard } from '../../hoc/isUserGuard';
import usePaginate from '../../hooks/usePaginate';
import * as carService from '../../services/carService';
import CarCard from '../Catalog/Card/CarCard';
import Paginate from '../Common/Paginate';
import Loading from '../Loading';

const UserCatalog = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const userCatalogData = await carService.getUserCars(user);
      setCars(userCatalogData.results);
      setLoading(false);
    })();
  }, []);

  const [currentCars, postsPerPage, paginate] = usePaginate(cars);

  return (
    <>
      {loading ? <Loading /> : '' }
      <h1 className="catalog-title">My Cars</h1>
      <section className="cars">
        { cars.length > 0
          ? <>
              {currentCars.map(x => <CarCard key={x.objectId} car={x} />)}
            </>
          : <p className="no-cars">You don't have cars yet!</p>
        }
      </section>
      {cars.length > 0
        ? <Paginate
            postsPerPage={postsPerPage}
            totalPosts={cars.length}
            paginate={paginate}
          />
        : ''
      }
    </>
  );
};

export default isUserGuard(UserCatalog);
