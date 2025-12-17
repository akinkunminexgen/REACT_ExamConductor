import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { Card, CardBody, CardHeader } from "reactstrap";

export default function MyLineChart({ title, dataKey, enrollmentData }) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="bg-light fw-semibold">
                {title}
            </CardHeader>

            <CardBody style={{ height: "300px", minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={dataKey[0]} />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey={dataKey[1]}
                            stroke="#0d6efd"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
}
