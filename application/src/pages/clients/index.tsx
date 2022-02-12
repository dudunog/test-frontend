import { GetStaticProps } from "next";
import MyTable from "../../components/MyTable";
import MaterialDrawer from "../../components/MaterialDrawer";
import { DrawerProvider } from "../../contexts/DrawerContext";
import { ModalProvider } from "../../contexts/ModalContext";
import Client from "../../interfaces/client";
import { api } from "../../services/api";

type HomeProps = {
  allClients: Client[];
};

export default function Home({ allClients }: HomeProps) {
  return (
    <>
      <DrawerProvider>
        <ModalProvider>
          <MyTable allClients={allClients}></MyTable>
        
          <MaterialDrawer />
        </ModalProvider>
      </DrawerProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<Client[]>('clients');

  return {
    props: {
      allClients: data
    },
    revalidate: 60 * 60 * 8, //8 hours
  };
};
