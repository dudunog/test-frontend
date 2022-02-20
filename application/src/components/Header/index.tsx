import { useContext } from "react";
import { Button } from "@mui/material";
import { ModalContext } from "../../contexts/ModalContext";

import styles from './styles.module.scss';

export default function Header() {
  const { handleOpen } = useContext(ModalContext);

  return (
    <div className={styles.header}>
      <Button variant="contained" onClick={handleOpen}>Adicionar cliente</Button>
    </div>
  )
}
