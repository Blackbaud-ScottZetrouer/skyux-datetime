import {
  ValidationErrors
} from '@angular/forms';

import {
  SkyDateRangeCalculation
} from './date-range-calculation';

import {
  SkyDateRangeCalculatorConfig
} from './date-range-calculator-config';

import {
  SkyDateRangeCalculatorId
} from './date-range-calculator-id';

import {
  SkyDateRangeCalculatorType
} from './date-range-calculator-type';

import {
  SkyDateRange
} from './date-range';

export class SkyDateRangeCalculator {

  /**
   * Indicates the text displayed within the calculator select menu.
   */
  public readonly shortDescription: string;

  /**
   * Indicates the calculator type.
   */
  public readonly type: SkyDateRangeCalculatorType;

  constructor(
    /**
     * Indicates the calculator id.
     */
    public readonly calculatorId: SkyDateRangeCalculatorId,
    private config: SkyDateRangeCalculatorConfig
  ) {
    this.type = config.type;
    this.shortDescription = config.shortDescription;
  }

  /**
   * Gets the current value of the calculator.
   * @param startDateInput Indicates the start date value.
   * @param endDateInput Indicates the end date value.
   */
  public getValue(startDateInput?: Date, endDateInput?: Date): SkyDateRangeCalculation {

    const result = this.config.getValue(startDateInput, endDateInput);

    /* tslint:disable:no-null-keyword */
    // (Angular form controls use null for the "empty" value.)

    let startDate: Date = null;
    if (result.startDate instanceof Date) {
      startDate = this.parseDateWithoutTime(result.startDate);
    }

    let endDate: Date = null;
    if (result.endDate instanceof Date) {
      endDate = this.parseDateWithoutTime(result.endDate);
    }

    /* tslint:enable */

    return {
      calculatorId: this.calculatorId,
      startDate,
      endDate
    };
  }

  /**
   * Performs synchronous validation against the control.
   * @param value
   */
  public validate(value?: SkyDateRange): ValidationErrors {
    if (!this.config.validate) {
      return;
    }

    return this.config.validate(value);
  }

  /**
   * Get a date object without time information.
   * See: https://stackoverflow.com/a/38050824/6178885
   */
  private parseDateWithoutTime(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }
}
