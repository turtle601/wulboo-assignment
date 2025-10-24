export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[480px] w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          찾을 수 없는 페이지입니다.
        </h1>
        <p className="text-gray-600 mb-2">
          주소를 잘못 입력했거나 삭제된 페이지예요!
        </p>
      </div>
    </div>
  );
}
