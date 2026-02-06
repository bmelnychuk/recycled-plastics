"use client";

import { Control, Controller, useFieldArray, useFormState } from "react-hook-form";
import {
    Field,
    FieldLabel,
} from "@/design-system/components/ui/field";
import { ColorSelect } from "@/features/material/ColorSelect";
import { MaterialConditionSelect } from "@/composite/form/MaterialConditionSelect";
import { FC } from "react";
import { MinMaxInput } from "../common/form/input/MinMaxInput";
// import { ProcessingMethodsSelect } from "@/composite/form/ProcessingMethodsSelect";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/design-system/components/ui/button";
import { FillerTypeSelect } from "./form/FillerTypeSelect";
import { PackagingTypeSelect } from "@/composite/form/PackagingTypeSelect";
import { ChainOfCustodySelect } from "./form/ChainOfCustodySelect";
import { ProcessingMethodsSelect } from "@/composite/form/ProcessingMethodsSelect";
import { RecyclingMethodSelect } from "./form/RecyclingMethodSelect";
import { MaterialSourceSelect } from "./form/MaterialSourceSelect";
import { IntendedMarketSelect } from "./form/IntendedMarketSelect";
import { Switch } from "@/design-system/components/ui/switch";
import { MaterialData } from "@/backend";

export type FormState = { material: MaterialData };

interface MaterialDataFormProps {
    control: Control<FormState>;
}

export const MaterialDataForm: FC<MaterialDataFormProps> = ({
    control
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "material.fillers",
    });

    const { errors } = useFormState({ control });
    const hasFillerErrors = Boolean(errors.material?.fillers);

    return (
        <>
            <Controller
                name="material.color"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.color">Color</FieldLabel>
                        <ColorSelect {...field} />
                    </Field>
                )}
            />
            <Controller
                name="material.packagingTypes"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.packagingTypes">Packaging types</FieldLabel>
                        <PackagingTypeSelect {...field} />
                    </Field>
                )}
            />
            <Controller
                name="material.recycledContent"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.recycledContent">
                            Recycled content
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.chainOfCustody"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.chainOfCustody">
                            Chain of custody
                        </FieldLabel>
                        <ChainOfCustodySelect {...field} />
                    </Field>
                )}
            />
            <Controller
                name="material.recyclingMethod"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.recyclingMethod">
                            Recycling method
                        </FieldLabel>
                        <RecyclingMethodSelect {...field} />
                    </Field>
                )}
            />
            <Controller
                name="material.source"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.source">
                            Material source
                        </FieldLabel>
                        <MaterialSourceSelect {...field} />
                    </Field>
                )}
            />
            <Controller
                name="material.processingMethods"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.processingMethods">
                            Processing methods
                        </FieldLabel>
                        <ProcessingMethodsSelect value={field.value ?? []} onChange={field.onChange} />
                    </Field>
                )}
            />

            <Controller
                name="material.intendedMarket"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.intendedMarket">
                            Intended market
                        </FieldLabel>
                        <IntendedMarketSelect  {...field} />
                    </Field>
                )}
            />
            <h2 className="font-bold text-foreground my-4">
                Physical properties
            </h2>
            <Controller
                name="material.viscosity"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.viscosity">
                            Viscosity
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.density"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.density">
                            Density
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.bulkDensity"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.bulkDensity">
                            Bulk density
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.ashContent"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.ashContent">
                            Ash content
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.condition"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.condition">
                            Material condition
                        </FieldLabel>
                        <MaterialConditionSelect {...field} />
                    </Field>
                )}
            />

            <Controller
                name="material.residualMoistureContent"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material.residualMoistureContent">
                            Residual moisture content
                        </FieldLabel>
                        <MinMaxInput
                            value={field.value?.value}
                            onChange={(value) => field.onChange(value ? { value } : undefined)}
                            onBlur={field.onBlur}
                            unit={"PERCENT"} />
                    </Field>
                )}
            />
            <Controller
                name="material.certificateOfAnalysis"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} orientation="horizontal" className="my-2">
                        <FieldLabel htmlFor="material.certificateOfAnalysis">
                            Certificate of analysis
                        </FieldLabel>
                        <Switch id="certificateOfAnalysis" checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                    </Field>
                )}
            />
            <Field>
                <FieldLabel className={hasFillerErrors ? "text-destructive" : undefined}>
                    Fillers
                </FieldLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <div className="flex-1">
                            <Controller
                                name={`material.fillers.${index}.type`}
                                control={control}
                                render={({ field }) => (
                                    <FillerTypeSelect value={field.value} onChange={field.onChange} />
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <Controller
                                name={`material.fillers.${index}.value`}
                                control={control}
                                render={({ field }) => (
                                    <MinMaxInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        unit={"PERCENT"}
                                    />
                                )}
                            />
                        </div>
                        <Button type="button" size="icon" variant="outline" onClick={() => remove(index)}>
                            <TrashIcon />
                        </Button>
                    </div>
                ))}
                <div className="flex justify-end">
                    <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => append({ type: "glassFibres", value: { min: 0 } })}
                    >
                        <PlusIcon /> Add filler
                    </Button>
                </div>
            </Field>
        </>

    );
};
