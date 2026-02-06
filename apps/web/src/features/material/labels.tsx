
import { FC } from "react";
import {
    Filler,
    MaterialCondition,
    MaterialData,
    MaterialType,
    MinMax,
} from "@/backend";

const humanize = (s: string) =>
    s
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const formatMinMax = (m: MinMax): string => {
    const { min, max } = m;
    if (min !== undefined && max !== undefined) return `${min} – ${max}`;
    if (min !== undefined) return `≥ ${min}`;
    if (max !== undefined) return `≤ ${max}`;
    return "—";
};

const formatMinMaxValue = (v: { value: MinMax }): string => formatMinMax(v.value);

const formatFiller = (f: Filler): string => `${humanize(f.type)}: ${formatMinMax(f.value)}`;

const condiditionLabels: Record<MaterialCondition, string> = {
    granules: "Granules",
    regrind: "Regrind",
    agglomerate: "Agglomerate",
    powder: "Powder",
    other: "Other",
}

export const MaterialConditionLabel: FC<{ condition?: MaterialCondition }> = ({ condition }) => {
    if (!condition) return null;
    return <>{condiditionLabels[condition]}</>;
};

export const MaterialTypeLabel: FC<{ type?: MaterialType }> = ({ type }) => {
    if (!type) return null;
    return <>{type.toUpperCase()}</>;
};

export const MinMaxValueLabel: FC<{ value?: MinMax, fallback?: string }> = ({ value, fallback }) => {
    if (!value) return fallback || null;
    return <>{formatMinMax(value)}</>;
};

/** Discriminated union: (property, value) pairs where value type matches MaterialData[property]. */
export type MaterialPropertyValueFromRecordProps = {
    [K in keyof MaterialData]: { property: K; value: MaterialData[K] };
}[keyof MaterialData];

export const MaterialPropertyValueFromRecord: FC<MaterialPropertyValueFromRecordProps> = (props) => {
    if (props == null) return null;
    switch (props.property) {
        case "type":
            return <>{props.value.toUpperCase()}</>;
        case "color":
            return <>{props.value}</>;
        case "condition":
            if (props.value == null) return null;
            return <>{condiditionLabels[props.value]}</>;
        case "packagingTypes":
            if (props.value == null) return null;
            return <>{props.value.map((v) => humanize(v)).join(", ")}</>;
        case "recycledContent":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "chainOfCustody":
            if (props.value == null) return null;
            return <>{humanize(props.value)}</>;
        case "recyclingMethod":
            if (props.value == null) return null;
            return <>{humanize(props.value)}</>;
        case "source":
            if (props.value == null) return null;
            return <>{humanize(props.value)}</>;
        case "processingMethods":
            if (props.value == null) return null;
            return <>{props.value.map((v) => humanize(v)).join(", ")}</>;
        case "intendedMarket":
            if (props.value == null) return null;
            return <>{humanize(props.value)}</>;
        case "viscosity":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "density":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "bulkDensity":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "ashContent":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "residualMoistureContent":
            if (props.value == null) return null;
            return <>{formatMinMaxValue(props.value)}</>;
        case "fillers":
            if (props.value == null) return null;
            return <>{props.value.map(formatFiller).join("; ")}</>;
        case "certificateOfAnalysis":
            return <>{props.value ? "Yes" : "No"}</>;
    }
};

