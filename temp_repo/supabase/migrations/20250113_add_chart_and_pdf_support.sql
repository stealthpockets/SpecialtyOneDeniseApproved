-- Add PDF support to insights and market_reports tables
ALTER TABLE insights ADD COLUMN IF NOT EXISTS pdf_url TEXT;
ALTER TABLE market_reports ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Create chart_configs table for storing chart data
CREATE TABLE IF NOT EXISTS chart_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chart_id TEXT NOT NULL UNIQUE, -- Used as placeholder reference in markdown
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('line', 'bar', 'pie', 'doughnut', 'area')),
    data JSONB NOT NULL, -- Chart.js data object
    options JSONB DEFAULT '{}', -- Chart.js options object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast chart lookup
CREATE INDEX IF NOT EXISTS idx_chart_configs_chart_id ON chart_configs(chart_id);

-- Add RLS policies
ALTER TABLE chart_configs ENABLE ROW LEVEL SECURITY;

-- Public read access to chart configs
CREATE POLICY "Chart configs are publicly readable" ON chart_configs
    FOR SELECT USING (true);

-- Only authenticated users can modify chart configs (for future admin interface)
CREATE POLICY "Authenticated users can modify chart configs" ON chart_configs
    FOR ALL USING (auth.role() = 'authenticated');

-- Add some sample chart data for testing
INSERT INTO chart_configs (chart_id, title, type, data, options) VALUES 
(
    'market-cap-rates-2024',
    'Average Cap Rates by Property Type - 2024',
    'bar',
    '{
        "labels": ["Manufactured Housing", "RV Parks", "Self Storage", "Multifamily", "Industrial"],
        "datasets": [{
            "label": "Average Cap Rate (%)",
            "data": [6.8, 7.2, 5.9, 5.5, 6.1],
            "backgroundColor": ["#8B5A3C", "#2D3A59", "#6B8E5A", "#8B5A3C99", "#2D3A5999"],
            "borderColor": ["#8B5A3C", "#2D3A59", "#6B8E5A", "#8B5A3C", "#2D3A59"],
            "borderWidth": 1
        }]
    }',
    '{
        "responsive": true,
        "maintainAspectRatio": false,
        "plugins": {
            "legend": {
                "display": false
            },
            "tooltip": {
                "callbacks": {
                    "label": "function(context) { return context.parsed.y + \"%\"; }"
                }
            }
        },
        "scales": {
            "y": {
                "beginAtZero": true,
                "ticks": {
                    "callback": "function(value) { return value + \"%\"; }"
                }
            }
        }
    }'
),
(
    'transaction-volume-trend',
    'Transaction Volume Trend - Last 12 Months',
    'line',
    '{
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "datasets": [{
            "label": "Transaction Volume ($M)",
            "data": [120, 135, 158, 142, 167, 189, 201, 185, 198, 224, 212, 195],
            "borderColor": "#8B5A3C",
            "backgroundColor": "#8B5A3C20",
            "fill": true,
            "tension": 0.4
        }]
    }',
    '{
        "responsive": true,
        "maintainAspectRatio": false,
        "plugins": {
            "legend": {
                "display": false
            }
        },
        "scales": {
            "y": {
                "beginAtZero": true,
                "ticks": {
                    "callback": "function(value) { return \"$\" + value + \"M\"; }"
                }
            }
        }
    }'
);
