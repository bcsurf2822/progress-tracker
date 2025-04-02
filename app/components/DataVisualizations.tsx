"use client";

import { useAppSelector } from "../hooks/redux";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const DataVisualizations = () => {
  const courses = useAppSelector((state) => state.courses.items);

  // Data for bar chart
  const barData = courses.map((course) => ({
    name: course.name,
    total: course.hours,
    completed: course.completedHours,
  }));

  // Data for pie chart
  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);
  const completedHours = courses.reduce(
    (sum, course) => sum + course.completedHours,
    0
  );
  const remainingHours = totalHours - completedHours;

  const pieData = [
    { name: "Completed", value: completedHours },
    { name: "Remaining", value: remainingHours },
  ];

  const PIE_COLORS = ["#10B981", "#6B7280"];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Progress Visualization
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Course Hours
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280" }}
                  axisLine={{ stroke: "#9CA3AF" }}
                />
                <YAxis
                  label={{
                    value: "Hours",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#6B7280" },
                  }}
                  tick={{ fill: "#6B7280" }}
                  axisLine={{ stroke: "#9CA3AF" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  name="Total Hours"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  name="Completed Hours"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Overall Progress
          </h3>
          <div className="h-80 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} hours`, ""]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
