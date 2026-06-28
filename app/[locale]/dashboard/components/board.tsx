import React from "react";

export default function Board({ titles, content }: { titles: [string, number][]; content?: React.JSX.Element[] | React.JSX.Element }) {
    return (
        <div className="w-full flex flex-col overflow-x-auto">
            <div className="flex flex-col justify-start items-start w-full min-w-fit">
                <div className="min-w-fit flex justify-center items-center w-full min-h-8 bg-(--clr-surface) p-4 rounded-t-2xl border border-(--clr-surface-light2)">
                    {titles.map(([t, w], i) => (
                        <p key={t + i} className={`min-w-40 lg:min-w-auto font-bold text-gray-400 ${w || "w-full"}`} style={w ? { width: w + "%" } : undefined}>
                            {t}
                        </p>
                    ))}
                </div>
            </div>
            {content ? (
                content
            ) : (
                <>
                    <div className={`min-w-40 lg:min-w-auto flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
                    <div className={`min-w-40 lg:min-w-auto flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
                    <div className={`min-w-40 lg:min-w-auto flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
                    <div className={`min-w-40 lg:min-w-auto flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
                    <div className={`min-w-40 lg:min-w-auto flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition rounded-b-2xl loading`}></div>
                </>
            )}
        </div>
    );
}
