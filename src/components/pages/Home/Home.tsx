import Link from "next/link";
import s from "./Home.module.scss";

const Home = () => {
  return (
    <div className={s.root}>
      <div className={s.homeWrapper} data-cursor-magnet>
        <p className={s.homeInner}>Div</p>
        <div className={s.home} data-cursor-magnet>
          Inner Div
        </div>
      </div>
      <button className={s.home} data-cursor-magnet>
        Button
      </button>
      <a href="#" className={s.home} data-cursor-magnet>
        Anchor
      </a>
      <Link href="/" data-cursor-magnet>
        Link
      </Link>
      <p className={s.home} data-cursor-magnet>
        Paragraph
      </p>
    </div>
  );
};

export default Home;
