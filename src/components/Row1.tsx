import { useGetKpisQuery } from "@/store/api";
import DashboardBox from "./DashboardBox";

type Props = {};

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery();
  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b">b</DashboardBox>
      <DashboardBox gridArea="c">c</DashboardBox>
    </>
  );
};

export default Row1;
