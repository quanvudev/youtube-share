import VideoList from '@/components/VideoList';

function HomePage() {
  return (
    <div
      className="max-w-screen flex flex-col items-center justify-center overflow-hidden"
      data-testid="homePage"
    >
      <VideoList />
    </div>
  );
}
export default HomePage;
