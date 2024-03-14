import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { reasons } from "./utils/reasons";
import "./ReportForm.css";

const reportApiUrl = "http://localhost:8080/api/report";
const authApiUrl = "http://localhost:8080/api/auth";

let userId: string;

interface ReportFormProps {
  onClose: () => void;
  gameCardId: number;
  username?: string;
}

interface ReportData {
  comment?: string;
  reason: string;
  gameCardId: number;
}

const Report: React.FC<ReportFormProps> = ({
  onClose,
  gameCardId,
  username,
}) => {
  const [reportData, setReportData] = useState<ReportData>({
    gameCardId: gameCardId,
    comment: "",
    reason: "",
  });

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReportData({
      ...reportData,
      comment: event.target.value,
    });
  };

  const handleReasonChange = (index: number) => {
    setReportData({
      ...reportData,
      reason: reasons[index].toUpperCase(),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      alert("Logg inn for å rapportere");
      return;
    }
    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;

    if (!token) {
      alert("Logg inn for å rapportere");
      return;
    }

    if (username !== undefined) {
      try {
        await fetch(`${authApiUrl}/get/id/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) =>
          response.json().then((data) => {
            if (!response.ok) {
              throw new Error(data.message);
            }
            userId = data;
          })
        );
      } catch (error) {
        console.error("Error during report:", error);
        alert(error);
      }

      const requestBodySubmit = JSON.stringify({
        ...reportData,
        reportingUserId: userInfo.id,
        ratingUserId: userId,
      });

      try {
        const response = await fetch(`${reportApiUrl}/send/comment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBodySubmit,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        alert("Du har sendt inn rapporten!");
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error during report:", error);
        alert(error);
      }
    } else {
      const requestBodySubmit = JSON.stringify({
        ...reportData,
        reportingUserId: userInfo.id,
      });

      try {
        const response = await fetch(`${reportApiUrl}/send/gamecard`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBodySubmit,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        alert("Du har sendt inn rapporten!");
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error during report:", error);
        alert(error);
      }
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <div className="popup-content">
          <div className="close-button" onClick={onClose}>
            <FaTimes />
          </div>
          <h2>Rapporter</h2>
          <div>
            <div>Jeg ønsker å rapportere, fordi det er:</div>
            {reasons.map((reason, index) => {
              return (
                <div>
                  <input
                    type="radio"
                    id={`custom-radio-${index}`}
                    value={reason}
                    name="reportReason"
                    onChange={() => handleReasonChange(index)}
                    className="categoryCheck"
                  />
                  <label
                    htmlFor={`custom-radio-${index}`}
                    className="categoryLabel"
                  >
                    {reason}
                  </label>
                </div>
              );
            })}
          </div>
          <div>
            <div>Kommentar:</div>
            <textarea
              className="comment"
              rows={4}
              cols={50}
              value={reportData.comment}
              onChange={handleCommentChange}
              placeholder="Skriv inn en rapportering"
            />
          </div>
          <button className="submitReport">Rapporter</button>
        </div>
      </form>
    </div>
  );
};

export default Report;
