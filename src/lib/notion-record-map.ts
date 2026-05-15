import type {
    CollectionMap,
    CollectionViewMap,
    ExtendedRecordMap,
    UserMap,
} from "notion-types";
import type { BlockMap } from "notion-types/build/index";

type NotionRecord<T> = {
    role: string;
    value: T;
};

type WrappedNotionRecord<T> = {
    spaceId?: string;
    value: NotionRecord<T>;
};

function unwrapRecordMap<T>(
    records: Record<string, NotionRecord<T> | WrappedNotionRecord<T>>,
) {
    return Object.fromEntries(
        Object.entries(records).map(([id, record]) => [
            id,
            isWrappedRecord(record) ? record.value : record,
        ]),
    );
}

function isWrappedRecord<T>(
    record: NotionRecord<T> | WrappedNotionRecord<T>,
): record is WrappedNotionRecord<T> {
    return (
        typeof record.value === "object" &&
        record.value !== null &&
        "value" in record.value &&
        "role" in record.value
    );
}

export function normalizeRecordMap(recordMap: ExtendedRecordMap) {
    return {
        ...recordMap,
        block: unwrapRecordMap(recordMap.block) as BlockMap,
        collection: unwrapRecordMap(recordMap.collection) as CollectionMap,
        collection_view: unwrapRecordMap(
            recordMap.collection_view,
        ) as CollectionViewMap,
        notion_user: unwrapRecordMap(recordMap.notion_user) as UserMap,
    } satisfies ExtendedRecordMap;
}
