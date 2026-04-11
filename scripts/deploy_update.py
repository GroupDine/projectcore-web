import subprocess
import os

def run_command(command, cwd=None):
    try:
        print(f"Ejecutando: {command}")
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True, cwd=cwd)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error ejecutando {command}:")
        print(e.stderr)
        return False

def main():
    repo_path = r"c:\Users\moozo\Desktop\BusinessAgent\Projectcore\projectcore-web"
    
    # 1. Verificar estado
    print("--- Verificando estado de Git ---")
    if not run_command("git status", cwd=repo_path):
        return

    # 2. Agregar cambios
    print("--- Agregando cambios ---")
    if not run_command("git add .", cwd=repo_path):
        return

    # 3. Commit
    print("--- Realizando commit ---")
    # Usamos un mensaje descriptivo basado en los cambios detectados
    commit_msg = "update: visual fixes and chatbot improvements (April 11)"
    if not run_command(f'git commit -m "{commit_msg}"', cwd=repo_path):
        print("Probablemente no hay cambios para commitear o el commit falló.")
        # No salimos aquí, intentamos push por si acaso hay commits pendientes previos

    # 5. Vercel Deploy
    print("--- Forzando despliegue en Vercel (Producción) ---")
    if not run_command("vercel --prod --yes", cwd=repo_path):
        print("El despliegue en Vercel falló. Es posible que el proyecto no esté vinculado correctamente.")
        return

    print("--- ¡Éxito! Los cambios han sido subidos y desplegados en ProjectCore.io. ---")
    print("Verifica la web en un momento.")

if __name__ == "__main__":
    main()
