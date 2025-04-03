import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Hash, Tag } from "react-bootstrap-icons";
import { CategoryManager } from "./AdminCategoryManager";
import { TagManager } from "./AdminTagManager";

export const AdminCategory = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="category"
        id="admin-category-tabs"
        className="mb-3"
      >
        {/* Category Tab */}
        <Tab
          eventKey="category"
          title={
            <span>
              <Hash className="me-2" /> Category
            </span>
          }
        >
          <CategoryManager />
        </Tab>

        {/* Tags Tab */}
        <Tab
          eventKey="tags"
          title={
            <span>
              <Tag className="me-2" /> Tags
            </span>
          }
        >
          <TagManager />
        </Tab>
      </Tabs>
    </div>
  );
};
