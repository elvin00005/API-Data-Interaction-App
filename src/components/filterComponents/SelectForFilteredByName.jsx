import Select from "react-select";

import styles from "./SelectForFilteredByName.module.scss";

export function SelectForFilteredByName({ userOptions, setSelectedUsers }) {
  return (
    <Select
      className={styles.selectOfName}
      isMulti
      options={userOptions}
      onChange={setSelectedUsers}
    />
  );
}
