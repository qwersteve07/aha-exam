import { useState } from "react";
import styles from "./index.module.sass";
import Button from "../button";

const tabs = [
  { id: "followers", name: "Followers" },
  { id: "following", name: "Following" },
];

const mockList = [
  {
    avatar: "",
    name: "John Doe",
    id: "@johndoe",
    status: "following",
  },
  {
    avatar: "",
    name: "John Doe",
    id: "@johndoe",
    status: "follow",
  },
  {
    avatar: "",
    name: "John Doe",
    id: "@johndoe",
    status: "following",
  },
  {
    avatar: "",
    name: "John Doe",
    id: "@johndoe",
    status: "follow",
  },
  {
    avatar: "",
    name: "John Doe",
    id: "@johndoe",
    status: "follow",
  },
];

type FollowsProps = {
  className: string;
}

const Follows = ({ className }: FollowsProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <aside className={`${className} ${styles.follows}`}>
      <ul className={styles.tabs}>
        {tabs.map((tab) => {
          return (
            <li
              className={tab.id === currentTab ? styles.active : ''}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
      <ul className={styles.list}>
        {mockList
          .filter((item) => {
            if (currentTab === "followers") return true;
            return item.status === "following";
          })
          .map((item) => {
            return (
              <li>
                <div className={styles.user}>
                  <div className={styles.avatar} />
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.id}>{item.id}</div>
                  </div>
                </div>
                <Button
                  type={item.status === "follow" ? "outlined" : "contained"}
                  onClick={() => { }}
                >
                  {item.status === "follow" ? "Follow" : "Following"}
                </Button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Follows;
