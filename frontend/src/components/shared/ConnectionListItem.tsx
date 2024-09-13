import { models } from "$/go/models";
import { Button } from "@/components/ui/button";
import { Edit, Terminal } from "lucide-react";

type Props = {
  connection: models.Connection;
  onClick: (connection: models.Connection) => void;
  onEdit: (connection: models.Connection) => void;
};

export default function ConnectionListItem({
  connection,
  onClick,
  onEdit,
}: Props) {
  return (
    <li key={connection.id} className="flex items-center">
      <Button
        variant={"ghost"}
        className="justify-start w-full pr-0"
        onClick={() => onClick(connection)}
      >
        <Terminal className="w-4 h-4 mr-2" />
        {connection.name}
        {/* <div className="flex flex-row items-end content-end justify-end w-full"></div> */}
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onEdit(connection)}>
        <Edit className="w-4 h-4" />
      </Button>
    </li>
  );
}
