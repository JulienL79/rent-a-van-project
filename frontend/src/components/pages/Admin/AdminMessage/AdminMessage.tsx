import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import { Message } from "../../../organisms/Message";
import type {
  TAdminMessageData,
  TAdminMessageRow,
} from "../../../../types/Message";
import { deleteMessage, fetchAllMessages } from "../../../../api/messageApi";

export const AdminMessage = () => {
  const [datas, setDatas] = useState<TAdminMessageData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminMessageRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedMessageCount, setDeletedMessageCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "content", "createdAt"];

  const selectMessage = (id: string) => {
    navigate(id);
  };

  const deleteMessageById = async (id: string) => {
    try {
      await deleteMessage(id);
      setDeletedMessageCount((prev) => prev + 1);
      handleSuccess("Message supprimé avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression du message",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const messageResponses = await fetchAllMessages();

      if (messageResponses && messageResponses.data) {
        const parsedData: TAdminMessageData[] = messageResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminMessageRow[] = parsedData.map(
          ({ id, content, createdAt }) => ({
            id,
            content,
            createdAt,
          }),
        );

        setSimplifiedDatas(simplifiedData);
      } else {
        setDatas([]);
        setSimplifiedDatas([]);
      }

      setIsLoading(false);
    };

    if (!id) {
      loadData();
    }
  }, [id, deletedMessageCount]);

  if (id) {
    return <Message page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "messages",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectMessage}
      onDelete={deleteMessageById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
