import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Menu = lazy(() => import('../modules/Menu/Menu'));
const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const SingleMovie = lazy(() => import('./singleMovie/singleMovie'));
const Cast = lazy(() => import('../components/cast/cast'));
const NotFound = lazy(() => import('./notFound/notFound'));
const Reviews = lazy(() => import('../components/reviews/reviews'));
const Loader = lazy(() => import('../components/loader/loader'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovie />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};
