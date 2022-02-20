import { GetStaticProps } from "next";
import { DrawerProvider } from "../../contexts/DrawerContext";
import { ModalProvider } from "../../contexts/ModalContext";
import Client from "../../interfaces/client";
import Header from "../../components/Header";
import MyTable from "../../components/MyTable";
import MyModal from "../../components/MyModal";
import { api } from "../../services/api";

import styles from '../../styles/Home.module.scss';

type HomeProps = {
  allClients: Client[];
};

export default function Home({ allClients }: HomeProps) {
  return (
    <>
      <div className={styles.container}>
        <DrawerProvider>
          <ModalProvider>
            <Header />
            <MyTable allClients={allClients} />
            <MyModal />
          </ModalProvider>
        </DrawerProvider>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get<Client[]>('clients');

  return {
    props: {
      allClients: data
    },
    revalidate: 60 * 60 * 8, //8 hours
  };
};
