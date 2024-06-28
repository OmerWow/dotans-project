import { addEvent } from "../actions";

export default function EventPage() {
  return (
    <form action={addEvent}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            ניהול אירוע
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            פה תוכל להוסיף אירוע חדש
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                שם האירוע
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="האירוע שלי"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="dateAndTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                תאריך ושעה
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="datetime-local"
                    id="dateAndTime"
                    name="dateAndTime"
                    defaultValue={new Date(
                      new Date().getTime() + 3 * 60 * 60 * 1000,
                    )
                      .toISOString()
                      .slice(0, 16)}
                    min={new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 16)}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                סוג אירוע
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="distribution"
                    name="event-kind"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="distribution"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    חלוקה
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="collection"
                    name="event-kind"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="collection"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    איסוף
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                סטאטוס אירוע
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="ongoing"
                    name="event-status"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="ongoing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    מתבצע
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="frozen"
                    name="event-status"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="frozen"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    הוקפא
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="finished"
                    name="event-status"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="finished"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    הסתיים
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                הערות לאירוע
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="הערות לאירוע"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">הוספת אנשים</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">פה תוכל להוסיף אנשים לאירוע</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                מתנדבים
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>

      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          שמור
        </button>
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
