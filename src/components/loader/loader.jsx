import css from './loader.module.css';
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.wrapperLoader}>
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#ad00b5"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
