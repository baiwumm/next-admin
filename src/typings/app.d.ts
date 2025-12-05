declare namespace App {

  /** @description: 查询时间 */
  type SearchTime = {
    startTime?: number; // 开始时间
    endTime?: number; // 结束时间
  };

  /** @description: 列项公共时间 */
  type ColumnTime = {
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
  }
}
