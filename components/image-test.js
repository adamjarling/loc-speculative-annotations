import styles from "./image-test.module.css";

export default function ImageTest() {
  const [percent, setPercent] = React.useState(50);
  const handlePercentChange = (e) => {
    setPercent(e.target.value);
  };

  return (
    <section className={styles.wrapper}>
      <img
        src={`https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:${percent}/0/default.jpg`}
        alt="LOC image"
        className={styles.image}
      />
      <div className={styles.formControl}>
        <label htmlFor="inputPercent">Picture % (1-100)</label>
        <input type="number" id="inputPercent" onChange={handlePercentChange} />
      </div>
    </section>
  );
}
