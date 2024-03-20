import { useCallback, useEffect, useState } from "react";
import "./ReportListView.css";
import ReportDeleteButton from "../DeleteButton/ReportDeleteButton";
import { Link } from "react-router-dom";
const reportApiUrl = "http://localhost:8080/api/report/get";
const gameCardApiUrl = "http://localhost:8080/api/gamecard/get/id";

interface ReportListViewProps {
  refreshKey: number;
}

type gameCardReport = {
  comment: string;
  gameCardId: number;
  reason: string;
  reportingUserId: number;
  reportingUsername: string;
  gameCardTitle?: string;
};

type commentReport = {
  comment: string;
  gameCardId: number;
  ratingUserId: number;
  ratingUsername: string;
  reason: string;
  reportingUserId: number;
  reportingUsername: string;
  ratingComment: string;
  gameCardTitle?: string;
};

const ReportListView = ({ refreshKey }: ReportListViewProps) => {
  const [gameCardReports, setGameCardReports] = useState<gameCardReport[]>([]);
  const [commentReports, setCommentReports] = useState<commentReport[]>([]);

  const fetchReports = useCallback(async () => {
    let headers = undefined;

    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      return;
    }
    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;
    headers = { Authorization: `Bearer ${token}` };

    fetch(`${reportApiUrl}/gamecard`, {
      method: "GET",
      headers: headers,
    }).then((response) =>
      response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        Promise.all(
          data.map((report: gameCardReport) =>
            fetch(`${gameCardApiUrl}/${report.gameCardId}`)
              .then((response) => response.json())
              .then((game) => ({ ...report, gameCardTitle: game.title }))
          )
        )
          .then((reportsWithTitles) => setGameCardReports(reportsWithTitles))
          .catch((error) =>
            console.error("Error fetching game titles:", error)
          );
      })
    );
    fetch(`${reportApiUrl}/comment`, {
      method: "GET",
      headers: headers,
    }).then((response) =>
      response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        Promise.all(
          data.map((report: gameCardReport) =>
            fetch(`${gameCardApiUrl}/${report.gameCardId}`)
              .then((response) => response.json())
              .then((game) => ({ ...report, gameCardTitle: game.title }))
          )
        )
          .then((reportsWithTitles) => setCommentReports(reportsWithTitles))
          .catch((error) =>
            console.error("Error fetching game titles:", error)
          );
      })
    );
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports, refreshKey]);

  return (
    <div className="lists-container">
      <div className="list-view">
        <h3 className="reportTitle">Rapporterte spill</h3>
        {gameCardReports.map((report) => (
          <div className="reportedComment">
            <Link to={`/spill/${report.gameCardId}`} className="reportLink">
              <div className="reportText">
                <div className="reportInfo">
                  Spilltittel: {report.gameCardTitle}
                </div>
                <div className="reportInfo">
                  Brukernavn (rapportør): {report.reportingUsername}
                </div>
                <div className="reportInfo">
                  Begrunnelse: {report.reason.toLowerCase()}
                </div>
                <div className="reportInfo">Kommentar: {report.comment}</div>
              </div>
              <div className="deleteReportButton">
                <ReportDeleteButton
                  gameId={report.gameCardId}
                  reportingUserId={report.reportingUserId}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="list-view">
        <h3 className="reportTitle">Rapporterte vurderinger</h3>
        {commentReports.map((report) => (
          <div className="reportedComment">
            <Link to={`/spill/${report.gameCardId}`} className="reportLink">
              <div className="reportText">
                <div className="reportInfo">
                  Spilltittel: {report.gameCardTitle}
                </div>
                <div className="reportInfo">
                  Brukernavn (rapportør): {report.reportingUsername}
                </div>
                <div className="reportInfo">
                  Brukernavn (rapportert): {report.ratingUsername}
                </div>
                <div className="reportInfo">
                  Begrunnelse: {report.reason.toLowerCase()}
                </div>
                <div className="reportInfo">Kommentar: {report.comment}</div>
                <div className="reportInfo">
                  Rapportert kommentar: {report.ratingComment}
                </div>
              </div>
              <div className="deleteReportButton">
                <ReportDeleteButton
                  gameId={report.gameCardId}
                  reportingUserId={report.reportingUserId}
                  ratingUserId={report.ratingUserId}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReportListView;
