import * as React from "react";
import { DriverType, OrderType, TruckType } from "../../../types/types";
import AdminListItem from "../AdminListItem/AdminListItem";

type AdminListType = {
  data: OrderType[] | DriverType[] | TruckType[];
  dataType: URLSearchParams;
  onClickHandle: any;
};

const AdminList: React.FC<AdminListType> = ({
  data,
  dataType,
  onClickHandle,
}) => {
  const genListItem = () => {
    return data.map((item: OrderType | DriverType | TruckType) => (
      <AdminListItem
        key={item.id}
        data={item}
        dataType={dataType}
        onClickHandle={onClickHandle}
      />
    ));
  };

  const listItem = genListItem();

  return (
    <div className={listItem.length > 0 ? 'adminlist' : 'adminlist'}>
      {listItem.length > 0 ? (
        <div className="adminlist_wrapper">{listItem}</div>
      ) : (
        <div className="holder">
          <h2>There are no {dataType.get("filter")} of this type yet </h2>
        </div>
      )}
    </div>
  );
};

export default AdminList;
