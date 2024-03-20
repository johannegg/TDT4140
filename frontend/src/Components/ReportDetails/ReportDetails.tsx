import ReportListView from "../ReportListView/ReportListView";

const gamesRefreshKey = 1;

const ReportDetails = () => {
  return (
    <ReportListView refreshKey={gamesRefreshKey}/>
  );
};

export default ReportDetails;