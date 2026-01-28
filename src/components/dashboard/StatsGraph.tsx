// React import removed
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

} from 'recharts';


const data = [
    { day: 'Mon', calories: 2100, weight: 75.5 },
    { day: 'Tue', calories: 1950, weight: 75.4 },
    { day: 'Wed', calories: 1800, weight: 75.2 },
    { day: 'Thu', calories: 2200, weight: 75.1 },
    { day: 'Fri', calories: 1900, weight: 74.9 },
    { day: 'Sat', calories: 2400, weight: 74.9 },
    { day: 'Sun', calories: 1850, weight: 74.7 },
];

export const StatsGraph = () => {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        yAxisId="left"
                        hide
                        domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(23, 23, 23, 0.8)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)'
                        }}
                        itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    />

                    {/* Weight Line */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        stroke="#ffffff"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#18181b', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, fill: '#fff' }}
                    />

                    {/* Calorie Line (Secondary) */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="calories"
                        stroke="#CCFF00"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={{ r: 4, fill: '#CCFF00' }}
                        opacity={0.6}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
