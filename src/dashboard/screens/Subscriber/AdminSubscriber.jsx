import React, { useState } from "react";
import { AdminUserTable } from "./AdminSubscriberTable";

export const AdminSubscriber = () => {
  return (
    <div>
      <h3 className="mb-4">Subscriber Management</h3>
      <AdminUserTable />
    </div>
  );
};
