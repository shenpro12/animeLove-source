import Styles from "./Loading.module.css";

function RequestLoading({ url, styles, text }) {
  return (
    <div
      className={`${Styles.requestLoading_container} flex flex-col`}
      style={
        styles
          ? {
              position: styles.position,
              zIndex: styles.z_Index,
              borderBottomLeftRadius: styles.border_radius,
              borderBottomRightRadius: styles.border_radius,
              top: styles.top,
              backgroundColor: styles.bg,
            }
          : {}
      }
    >
      <img
        alt="banner"
        width={styles && styles.width ? styles.width : "150px"}
        height={styles && styles.height ? styles.height : "250px"}
        src={url}
      />
      {text ? (
        <h1 className="mt-1 text-xs font-medium font-mono text-black">
          {text}
        </h1>
      ) : (
        <h1 className="mt-5 text-sm font-medium font-mono text-white">
          Processing...
        </h1>
      )}
    </div>
  );
}

export default RequestLoading;
