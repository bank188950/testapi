"use client";
import { useQuery } from "@tanstack/react-query";
const LangPage = () => {
  const {
    isLoading: isLoadingSidebar,
    isSuccess: isSuccessSidebar,
    data: dataSidebar,
  } = useQuery({
    queryKey: ["sideBarLang"],
    queryFn: async () => {
      const response = await fetch("lang/sidebar.json");
      return await response.json();
    },
  });

  if (isLoadingSidebar) return <div>Loading...</div>;

  if (isSuccessSidebar) {
    return (
      <>
        <div>{dataSidebar.th.sidebar[0].name}</div>
        <br />
        <br />
        <div>{dataSidebar.th.sidebar[1].name}</div>
      </>
    );
  }
};

export default LangPage;
