import styles from "./ScreenLoading.module.scss";

type Props = {
  isLoading: boolean;
};

const ScreenLoading: React.FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles.container}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  ) : null;
};

export default ScreenLoading;
