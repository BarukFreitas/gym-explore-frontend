// Dentro do seu arquivo CardGym.js ou .tsx

interface Gym {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

// Defina as props que o Card recebe
interface GymCardProps {
  gym: Gym;
}

// Receba a prop 'gym'
export default function GymCard({ gym }: GymCardProps) {
  return (
      <div className="gym-card bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-80">
        {/* Use os dados da academia */}
        <img
            src={gym.imageUrl}
            alt={`Foto da ${gym.name}`}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{gym.name}</h2>
          <p className="text-gray-400 mb-1"><strong>Endereço:</strong> {gym.address}</p>
          <p className="text-gray-400"><strong>Telefone:</strong> {gym.phone}</p>
        </div>
      </div>
  );
}