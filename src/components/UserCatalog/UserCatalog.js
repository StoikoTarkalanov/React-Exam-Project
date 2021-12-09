/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { isUserGuard } from '../../hoc/isUserGuard';
import * as carService from '../../services/carService';
import CarCard from '../Catalog/Card/CarCard';
import Loading from '../Loading';

const UserCatalog = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    (async () => {
      const userCatalogData = await carService.getUserCars(user);
      setCars(userCatalogData.results);
      setLoading(false);
    })();
  }, []);

  return (
    <>
    {loading ? <Loading /> : '' }
      <h1 className="catalog-title">My Cars</h1>
      <section className="cars">
        { cars.length > 0
          ?
            <>
              {cars.map(x => <CarCard key={x.objectId} car={x} />)}
            </>
          : <p className="no-cars">You don't have cars yet!</p>
        }
      </section>
    </>
  );
};

export default isUserGuard(UserCatalog);
