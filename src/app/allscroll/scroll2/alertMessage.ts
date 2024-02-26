import {
  type PaginationType,
  type StatusType,
  type LangType,
} from "@/utils/type";
// Badge slider
type AlertBadgeType = {
  status: StatusType;
  pagination: PaginationType;
  data: {
    all: number;
    reminder: number;
    notification: number;
    approve: number;
  };
};

export async function selectAlertBadge(
  lang: LangType
): Promise<AlertBadgeType> {
  const fetchResponse = await fetch("api/getfetchdata");
  const fetchData = await fetchResponse.json();
  const token: string = fetchData.data.accessToken;

  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${process.env.NEXT_PUBLIC_PATHURL}/api/v1/me/alert?lang=${lang}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Network response was not ok.`);
  }

  const data = await response.json();
  return data;
}

// Message list
export type messageDataType = {
  messageId: string;
  title: string;
  subTitle: string;
  description: string;
  date: string;
  time: string;
  isReaded: boolean;
  messageType: {
    primary: number;
    secondary: number;
  };
};

export type messageType = {
  status: StatusType;
  pagination: PaginationType;
  data: messageDataType[];
};

export async function selectMessageList(
  pageNumber: number
): Promise<messageType> {
  const token: string =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJhcGk6Ly9lZTg3NDYzNy0wZGJiLTQxYjItODczNC00MTUzODg0MTMwOTQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NzViZGQwYS02ODhiLTQxZDItOTZiNy00NTRkMjgwMDQzYWEvIiwiaWF0IjoxNzA4OTEwODQ0LCJuYmYiOjE3MDg5MTA4NDQsImV4cCI6MTcwODkxNTk0OSwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhXQUFBQXBqSlJ2SWZDaDQrR2NYNU5zcDlYck9NQi9WOENNSFVYdC9GakNxa1JJUk12bmZEUFJ3Zzh3Ymx5OGpmTUlMaEQxbisvT3MyVFd5UVpicWQ1cGZIN014djhKZnUwREEvWGxacmttM1hBTW1zPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiJlZTg3NDYzNy0wZGJiLTQxYjItODczNC00MTUzODg0MTMwOTQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlNvbWJvb24iLCJnaXZlbl9uYW1lIjoiUGFudXBvbmciLCJpcGFkZHIiOiIxMjQuMTIxLjk0LjExOCIsIm5hbWUiOiJQYW51cG9uZyBTb21ib29uIiwib2lkIjoiM2E4YmZjMjUtZTY0Ni00M2ZkLWJhOWMtNDA2M2IwNTYwMDk5Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE1MjE4NzAzNy0xNzMyOTIzOTY3LTU3Mjk0NDIyNS00Mzg2MCIsInJoIjoiMC5BVk1BQ3QxYmg0dG8wa0dXdDBWTktBQkRxamRHaC02N0RiSkJoelJCVTRoQk1KVEZBUEkuIiwic2NwIjoicmVhZCB3cml0ZSIsInN1YiI6IlZ4QXo5UW5BS3B2ZVEyWnVOMlZ2cURDeXNaNk5saW5lbE9XTEMzbTVDamsiLCJ0aWQiOiI4NzViZGQwYS02ODhiLTQxZDItOTZiNy00NTRkMjgwMDQzYWEiLCJ1bmlxdWVfbmFtZSI6IlBhbnVwb25nLlNvbUBTQU5TSVJJLmNvbSIsInVwbiI6IlBhbnVwb25nLlNvbUBTQU5TSVJJLmNvbSIsInV0aSI6InhfRE1GbjNERjBPOTNSb05UOUl1QUEiLCJ2ZXIiOiIxLjAifQ.LmTzI2z6wEYKu0ujP7tReIpxUTsIAoOjvgXCZugOzxx8Yxkf1wvfmXw_6wq5lFQbnHCr7rfhCX9eOdUPDCoTvmVIam4flmWxwu8_70m6i-CQp9zld5pEfj8T-qAsPgjdUdY7XVa49GEwAgGxBCVqkVIC5A_0qHoisX2lgmT-tSimExYdX4uyFWy66kGG8QHssAbQIB4o62Brh46N6pDp4FeRvS_mtWi9Ual6pr_RiZmqFg2uBoNaWNM6m4HWyomy-aRVypcxERmDMzg8D5VgPUXzm0uehwJEs3avrHR_KztfIIVi9P1rxgIVFRpExzjjoTWV5ONISFhCtO1wTFBcIA";

  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${process.env.NEXT_PUBLIC_PATHURL}/api/v1/me/messages?pageNumber=${pageNumber}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Network response was not ok.`);
  }

  const data = await response.json();
  return data;
}
